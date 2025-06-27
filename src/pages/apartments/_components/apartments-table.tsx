"use client";

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
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import type { IApartment } from "@/interfaces/apartment.interface";
import { apartmentService } from "@/services/apartment.service";
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { IVillage } from "@/interfaces/location/village.interface";

type PaginatedResponse = {
  count: number;
  total_pages: number;
  current_page: number;
  next: number | null;
  previous: number | null;
  results: IApartment[];
};

export default function ApartmentTable() {
  const [data, setData] = useState<PaginatedResponse>();
  const [form, setForm] = useState<{ name: string; village: string; area: number }>({ name: "", village: "", area: 0 });
  const [villages, setVillages] = useState<IVillage[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchApartments = async () => {
    try {
      const data = await apartmentService.findAll();
      setData(data);
    } catch { /* ignore */ }
  };

  const fetchVillages = async () => {
    try {
      const res = await apartmentService.getVillages();
      setVillages(res.results || res);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    fetchApartments();
    fetchVillages();
  }, []);

  const openCreateDialog = () => {
    setForm({ name: "", village: "", area: 0 });
    setEditId(null);
    setDialogOpen(true);
  };

  const openEditDialog = (apartment: IApartment) => {
    setForm({ name: apartment.name, village: apartment.village.id, area: apartment.area });
    setEditId(apartment.id.toString());
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setForm({ name: "", village: "", area: 0 });
    setEditId(null);
    setDialogOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVillageChange = (value: string) => {
    setForm({ ...form, village: value });
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await apartmentService.findByIdAndUpdate({ id: editId, ...form, area: Number(form.area) });
      } else {
        await apartmentService.insertOne({ ...form, area: Number(form.area) });
      }
      closeDialog();
      fetchApartments();
    } catch { /* ignore */ }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await apartmentService.findByIdAndDelete(deleteId);
      setDeleteId(null);
      fetchApartments();
    } catch { /* ignore */ }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Xonadorlar ro'yhati</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" onClick={openCreateDialog}>
                <Plus /> Q'shish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editId ? "Xonadonni tahrirlash" : "Yangi xonadon qo'shish"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateOrUpdate} className="flex flex-col gap-4">
                <Label htmlFor="name">Xonadon nomi</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Xonadon nomi"
                  required
                />
                <Label htmlFor="village">Mahalla</Label>
                <Select value={form.village} onValueChange={handleVillageChange}>
                  <SelectTrigger id="village">
                    <SelectValue placeholder="Mahalla tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="area">Maydoni (m²)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={form.area}
                  onChange={handleFormChange}
                  placeholder="Maydon"
                  required
                />
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
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Uy xoʻjaliklari, qishloqlar, tumanlar yoki viloyatlarni qidiring..."
              className="max-w-sm"
            />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Xonadon nomi</TableHead>
                <TableHead>Mahalla</TableHead>
                <TableHead>Tuman</TableHead>
                <TableHead>Viloyat</TableHead>
                <TableHead>Maydoni</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((apartment) => (
                <TableRow key={apartment.id}>
                  <TableCell className="font-medium">{apartment.id}</TableCell>
                  <TableCell>{apartment.name}</TableCell>
                  <TableCell>{apartment.village.name}</TableCell>
                  <TableCell>{apartment.village.district.name}</TableCell>
                  <TableCell>
                    {apartment.village.district.region.name}
                  </TableCell>
                  <TableCell>{apartment.area} m²</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => openEditDialog(apartment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setDeleteId(apartment.id.toString())}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Aminmisiz</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu amalni ortga qaytarib bo'lmaydi. "
                              {apartment.name}" ni butunlay yo'q qilish.
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
              {data?.results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {data?.results.length} of {data?.count} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={data?.previous === null}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm font-medium">
              Page {data?.current_page} of {data?.total_pages}
            </div>
            <Button variant="outline" size="sm" disabled={data?.next === null}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
