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

  useEffect(() => {
    (async () => {
      try {
        const data = await apartmentService.findAll();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Xonadorlar ro'yhati</CardTitle>
          <Button className="cursor-pointer">
            <Plus />
            Q'shish
          </Button>
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
                      <Button variant="outline" size="sm" className="cursor-pointer">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Aminmisiz</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu amalni ortga qaytarib bo‘lmaydi. "
                              {apartment.name}" ni butunlay yo'q qilish.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Bekor qilish
                            </AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer">
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
