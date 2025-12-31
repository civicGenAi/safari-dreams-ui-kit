import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import mammoth from 'mammoth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ParsedPackage {
  title: string;
  description: string;
  price: number;
  duration: number;
  destination: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  excluded: string[];
  itinerary: Array<{ day: number; title: string; description: string }>;
  status: 'pending' | 'success' | 'error';
  error?: string;
}

export const BulkImport = () => {
  const { toast } = useToast();
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [parsedPackages, setParsedPackages] = useState<ParsedPackage[]>([]);
  const [progress, setProgress] = useState(0);

  const parseWordDocument = async (file: File): Promise<ParsedPackage[]> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // Parse the document - looking for package sections
      const packages: ParsedPackage[] = [];
      const packageSections = text.split(/Package \d+:|PACKAGE \d+:/i);

      for (let i = 1; i < packageSections.length; i++) {
        const section = packageSections[i];

        try {
          // Extract package details using regex patterns
          const titleMatch = section.match(/Title[:\s]+(.*?)(?:\n|$)/i);
          const descMatch = section.match(/Description[:\s]+(.*?)(?:\n\n|\n(?=Price|Duration))/is);
          const priceMatch = section.match(/Price[:\s]+\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
          const durationMatch = section.match(/Duration[:\s]+(\d+)\s*(?:days?|d)/i);
          const destinationMatch = section.match(/Destination[:\s]+(Tanzania|Kenya|Rwanda|Uganda|South Africa|Namibia|Botswana)/i);
          const categoryMatch = section.match(/Category[:\s]+(Safari|Trekking|Wildlife|Beach|Luxury|Adventure)/i);
          const difficultyMatch = section.match(/Difficulty[:\s]+(Easy|Moderate|Challenging)/i);

          // Extract included items
          const includedMatch = section.match(/Included[:\s]+(.*?)(?:\n\n|Excluded:|Not Included:)/is);
          const included = includedMatch
            ? includedMatch[1].split('\n').map(item => item.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
            : [];

          // Extract excluded items
          const excludedMatch = section.match(/(?:Excluded|Not Included)[:\s]+(.*?)(?:\n\n|Itinerary:|Day 1:)/is);
          const excluded = excludedMatch
            ? excludedMatch[1].split('\n').map(item => item.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
            : [];

          // Extract itinerary
          const itinerary: Array<{ day: number; title: string; description: string }> = [];
          const itineraryMatches = section.matchAll(/Day\s+(\d+)[:\s]+(.*?)(?:\n)(.*?)(?=\nDay\s+\d+:|$)/gis);
          for (const match of itineraryMatches) {
            itinerary.push({
              day: parseInt(match[1]),
              title: match[2].trim(),
              description: match[3].trim()
            });
          }

          if (titleMatch) {
            const pkg: ParsedPackage = {
              title: titleMatch[1].trim(),
              description: descMatch ? descMatch[1].trim() : '',
              price: priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0,
              duration: durationMatch ? parseInt(durationMatch[1]) : 1,
              destination: destinationMatch ? destinationMatch[1] : 'Tanzania',
              category: categoryMatch ? categoryMatch[1] : 'Safari',
              difficulty: (difficultyMatch ? difficultyMatch[1] : 'Moderate') as 'Easy' | 'Moderate' | 'Challenging',
              included,
              excluded,
              itinerary,
              status: 'pending'
            };
            packages.push(pkg);
          }
        } catch (error) {
          console.error('Error parsing package section:', error);
        }
      }

      return packages;
    } catch (error: any) {
      throw new Error(`Failed to parse document: ${error.message}`);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setParsing(true);
    try {
      const allPackages: ParsedPackage[] = [];

      for (const file of acceptedFiles) {
        const packages = await parseWordDocument(file);
        allPackages.push(...packages);
      }

      if (allPackages.length === 0) {
        toast({
          title: 'No Packages Found',
          description: 'Could not find any package data in the document(s). Please check the format.',
          variant: 'destructive',
        });
      } else {
        setParsedPackages(allPackages);
        toast({
          title: 'Success',
          description: `Found ${allPackages.length} package(s) in the document(s)`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Parse Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setParsing(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const importPackages = async () => {
    setImporting(true);
    setProgress(0);

    const updatedPackages = [...parsedPackages];
    const total = updatedPackages.length;

    for (let i = 0; i < updatedPackages.length; i++) {
      const pkg = updatedPackages[i];

      try {
        // Generate slug
        const slug = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        const { error } = await supabase
          .from('packages')
          .insert([{
            title: pkg.title,
            slug,
            description: pkg.description,
            price: pkg.price,
            duration: pkg.duration,
            image: '/src/assets/tours/placeholder.jpg', // Default image
            destination: pkg.destination,
            category: pkg.category,
            difficulty: pkg.difficulty,
            included: pkg.included,
            excluded: pkg.excluded,
            itinerary: pkg.itinerary,
          }]);

        if (error) throw error;

        updatedPackages[i].status = 'success';
      } catch (error: any) {
        updatedPackages[i].status = 'error';
        updatedPackages[i].error = error.message;
      }

      setProgress(Math.round(((i + 1) / total) * 100));
      setParsedPackages([...updatedPackages]);
    }

    setImporting(false);

    const successCount = updatedPackages.filter(p => p.status === 'success').length;
    const errorCount = updatedPackages.filter(p => p.status === 'error').length;

    toast({
      title: 'Import Complete',
      description: `${successCount} package(s) imported successfully. ${errorCount} failed.`,
      variant: errorCount > 0 ? 'destructive' : 'default',
    });
  };

  return (
    <div className="space-y-6">
      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Document Format Guide</CardTitle>
          <CardDescription>Follow this format for best results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>Your Word document should follow this structure for each package:</p>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`Package 1:
Title: 5-Day Serengeti Safari Adventure
Description: Experience the breathtaking Serengeti wilderness...
Price: $1850
Duration: 5 days
Destination: Tanzania
Category: Safari
Difficulty: Moderate

Included:
- Park entrance fees
- Professional safari guide
- Accommodation
- Meals (breakfast, lunch, dinner)
- Safari vehicle with pop-up roof

Excluded:
- International flights
- Travel insurance
- Tips for guide and staff
- Personal expenses

Itinerary:
Day 1: Arrival in Arusha
Meet and greet at Kilimanjaro Airport. Transfer to hotel in Arusha for overnight stay.

Day 2: Tarangire National Park
Morning departure to Tarangire. Full day game drive viewing elephants and baobab trees.

...

Package 2:
Title: Next Package Name
...`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Word Documents</CardTitle>
          <CardDescription>Upload .docx files containing package information</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary'}
            `}
          >
            <input {...getInputProps()} />
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            {parsing ? (
              <p className="text-primary font-semibold">Parsing document...</p>
            ) : isDragActive ? (
              <p className="text-primary font-semibold">Drop documents here...</p>
            ) : (
              <div>
                <p className="font-semibold mb-2">Drag & drop Word documents here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse (.docx files only)</p>
                <Button type="button" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parsed Packages */}
      {parsedPackages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Parsed Packages ({parsedPackages.length})</CardTitle>
                <CardDescription>Review before importing to database</CardDescription>
              </div>
              <Button
                onClick={importPackages}
                disabled={importing || parsedPackages.every(p => p.status !== 'pending')}
                variant="primary"
              >
                Import All Packages
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {importing && (
              <div className="mb-6">
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-center text-muted-foreground">Importing packages... {progress}%</p>
              </div>
            )}

            <div className="space-y-4">
              {parsedPackages.map((pkg, index) => (
                <Card key={index} className={`
                  ${pkg.status === 'success' ? 'border-green-500' : ''}
                  ${pkg.status === 'error' ? 'border-red-500' : ''}
                `}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{pkg.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{pkg.destination}</span>
                          <span>•</span>
                          <span>{pkg.category}</span>
                          <span>•</span>
                          <span>{pkg.duration} days</span>
                          <span>•</span>
                          <span>${pkg.price}</span>
                        </div>
                      </div>
                      <div>
                        {pkg.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {pkg.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                        {pkg.status === 'pending' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{pkg.description}</p>

                    {pkg.error && (
                      <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-600">
                        Error: {pkg.error}
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-semibold">Included:</span> {pkg.included.length} items
                      </div>
                      <div>
                        <span className="font-semibold">Excluded:</span> {pkg.excluded.length} items
                      </div>
                      <div>
                        <span className="font-semibold">Itinerary:</span> {pkg.itinerary.length} days
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
