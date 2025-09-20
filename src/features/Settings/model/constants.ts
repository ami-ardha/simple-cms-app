// Tipe data field yang lebih generik untuk mendukung berbagai jenis input
export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'select';
  placeholder?: string;
};

// Konfigurasi untuk form "Add Menu Group"
export const addGroupFormFields: FormField[] = [
  {
    name: 'groupName',
    label: '', // Label bisa dikosongkan jika tidak perlu
    type: 'text',
    placeholder: 'e.g., Laporan',
  },
];

// Konfigurasi untuk form "Add Menu"
export const addMenuFormFields: FormField[] = [
  {
    name: 'groupId',
    label: 'Pilih Grup',
    type: 'select',
  },
  {
    name: 'menuName',
    label: '',
    type: 'text',
    placeholder: 'e.g., Laporan Penjualan',
  },
];
