import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import type { IService, IServiceCategory } from "@/interfaces/service.interface";
import { serviceService } from "@/services/serivce.service";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ServicesTable() {
  const [data, setData] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<IService>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categories, setCategories] = useState<IServiceCategory[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await serviceService.list();
      setData(res.results);
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    (async () => {
      try {
        const cats = await serviceService.getCategories();
        setCategories(cats);
      } catch {
        // ignore
      }
    })();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files).slice(0, 5);
    setImageFiles(arr);
    setFilePreviews(arr.map((file) => URL.createObjectURL(file)));
  };

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category_id: Number(value) });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload: FormData | object = form;
      if (imageFiles.length > 0) {
        const fd = new FormData();
        fd.append("title", form.title as string);
        fd.append("category_id", String(form.category_id));
        fd.append("description", description);
        imageFiles.forEach((file) => fd.append("image_files", file));
        payload = fd;
      } else {
        payload = { ...form, description };
      }
      if (editId) {
        await serviceService.update(editId, payload);
      } else {
        await serviceService.create(payload);
      }
      setDialogOpen(false);
      setForm({});
      setEditId(null);
      setDescription("");
      setImageFiles([]);
      setFilePreviews([]);
      fetchServices();
    } catch {
      setError("Saqlashda xatolik yuz berdi");
    }
  };

  const openCreateDialog = () => {
    setEditId(null);
    setForm({});
    setDescription("");
    setImageFiles([]);
    setFilePreviews([]);
    setDialogOpen(true);
  };

  const openEditDialog = (service: IService) => {
    setForm({
      title: service.title,
      category_id: service.category_id,
    });
    setDescription(service.service?.description?.[0] || "");
    setImageFiles([]);
    setFilePreviews([]);
    setEditId(service.id.toString());
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setEditId(null);
    setForm({});
    setDescription("");
    setImageFiles([]);
    setFilePreviews([]);
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await serviceService.delete(deleteId);
      setDeleteId(null);
      fetchServices();
    } catch {
      setError("O'chirishda xatolik yuz berdi");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Xizmatlar ro'yxati</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" onClick={openCreateDialog}>
                <Plus /> Qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editId ? "Xizmatni tahrirlash" : "Yangi xizmat qo'shish"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateOrUpdate} className="flex flex-col gap-4">
                <Label htmlFor="title">Xizmat nomi</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title || ""}
                  onChange={handleFormChange}
                  placeholder="Xizmat nomi"
                  required
                />
                <Label htmlFor="category_id">Kategoriya</Label>
                <Select value={form.category_id ? String(form.category_id) : undefined} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category_id">
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="description">Tavsif</Label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Xizmat tavsifi"
                  minLength={1}
                  className="border rounded-md p-2"
                  required
                />
                <Label htmlFor="image_files">Rasmlar (maks. 5 ta)</Label>
                <Input
                  id="image_files"
                  name="image_files"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                {filePreviews.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {filePreviews.map((src, i) => (
                      <img key={i} src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
                    ))}
                  </div>
                )}
                <DialogFooter>
                  <Button type="submit">{editId ? "Saqlash" : "Qo'shish"}</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={closeDialog}>Bekor qilish</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>
          {/* Qidiruv va boshqa filterlar joyi */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Yuklanmoqda...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Nomi</TableHead>
                  <TableHead>Kategoriya</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>{service.title}</TableCell>
                    <TableCell>{service.service?.category?.title}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => openEditDialog(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setDeleteId(service.id.toString())}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Aminmisiz</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu amalni ortga qaytarib bo'lmaydi. "{service.title}" ni butunlay yo'q qilish.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer" onClick={() => setDeleteId(null)}>
                                Bekor qilish
                              </AlertDialogCancel>
                              <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer" onClick={handleDelete}>
                                O'chirish
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Natija topilmadi
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 