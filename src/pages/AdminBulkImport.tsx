import { AdminLayout } from '@/components/admin/AdminLayout';
import { BulkImport } from '@/components/admin/BulkImport';

const AdminBulkImport = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Bulk Import</h1>
          <p className="text-muted-foreground">Upload Word documents to import multiple packages at once</p>
        </div>

        <BulkImport />
      </div>
    </AdminLayout>
  );
};

export default AdminBulkImport;
