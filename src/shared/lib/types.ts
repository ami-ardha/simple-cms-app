// Hapus interface Menu dan MenuGroup yang lama, ganti dengan ini:

export interface FunctionPermission {
  id: string;
  name: string;
  action: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' | string; // Bisa diperluas jika ada action lain
  status: boolean;
}

export interface ModulePermission {
  moduleId: string;
  moduleName: string;
  functions: FunctionPermission[];
}

export interface UserPermissions {
  id: string;
  name: string; // Nama role, misal: "Superuser"
  description: string;
  permissions: ModulePermission[];
}
