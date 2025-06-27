import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Phone,
  Home,
  Edit,
  Trash2,
  Search,
  Filter,
} from "lucide-react";
import type { ICitizen } from "@/interfaces/citizen.interface";
import { citizenService } from "@/services/citizen.service";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type PaginatedResponse = {
  count: number;
  total_pages: number;
  current_page: number;
  next: number | null;
  previous: number | null;
  results: ICitizen[];
};

export default function CitizensTable() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [expandedLeave, setExpandedLeave] = useState<Set<number>>(new Set());
  const [expandedAssets, setExpandedAssets] = useState<Set<number>>(new Set());
  const [citizens, setCitizens] = useState<PaginatedResponse>();

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    gender: "all",
    employment_status: "all",
    marital_status: "all",
    district: "all",
    region: "all",
    is_at_risk: "all",
    needs_support: "all",
    under_supervision: "all",
  });

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleLeave = (id: number) => {
    const newExpanded = new Set(expandedLeave);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedLeave(newExpanded);
  };

  const toggleAssets = (id: number) => {
    const newExpanded = new Set(expandedAssets);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedAssets(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (
    status: boolean,
    trueText: string,
    falseText: string
  ) => {
    return (
      <Badge variant={status ? "destructive" : "secondary"}>
        {status ? trueText : falseText}
      </Badge>
    );
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      gender: "all",
      employment_status: "all",
      marital_status: "all",
      district: "all",
      region: "all",
      is_at_risk: "all",
      needs_support: "all",
      under_supervision: "all",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await citizenService.findAll();
        setCitizens(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Pagination Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Fuqorolar ro'yhati
          </CardTitle>
          <CardDescription>
            Showing {citizens?.count} of {citizens?.count} results (Page{" "}
            {citizens?.current_page} of {citizens?.total_pages})
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or phone..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {Object.values(filters).some((v) => v !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {Object.values(filters).filter((v) => v !== "all").length}
                  </Badge>
                )}
              </Button>
              {Object.values(filters).some((v) => v !== "all") && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="pageSize">Show:</Label>
              <Select>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        {/* Advanced Filters */}
        {showFilters && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All genders" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Employment Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="status-2">status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Marital Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value={"status-1"}>status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>District</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All districts</SelectItem>
                    <SelectItem value={"item-1"}>Tong mahalasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>At Risk</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">At Risk</SelectItem>
                    <SelectItem value="false">Not at Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Needs Support</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Needs Support</SelectItem>
                    <SelectItem value="false">No Support Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Under Supervision</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Under Supervision</SelectItem>
                    <SelectItem value="false">Not Supervised</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Main Citizens Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Rasm</TableHead>
                <TableHead>Fuqoro</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bandlik</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {citizens?.results.map((citizen) => (
                <>
                  <TableRow
                    key={citizen.id}
                    className="cursor-pointer"
                    onClick={() => toggleRow(citizen.id)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        {expandedRows.has(citizen.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={
                            citizen.photo ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={`${citizen.first_name} ${citizen.last_name}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {citizen.first_name} {citizen.middle_name}{" "}
                          {citizen.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {citizen.id} • {citizen.gender} • Age:{" "}
                          {new Date().getFullYear() -
                            new Date(citizen.birthday).getFullYear()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {citizen.phone}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tuqilgan: {formatDate(citizen.birthday)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {citizen.village.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {citizen.village.district.name},{" "}
                        {citizen.village.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">
                          {citizen.marital_status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Bolalari: {citizen.children_count}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="secondary">
                          {citizen.employment_status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Daromad: {citizen.income_level}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(citizen.is_at_risk, "At Risk", "Safe")}
                        {citizen.needs_support && (
                          <Badge variant="outline">Yordamga muhtoj</Badge>
                        )}
                        {citizen.under_supervision && (
                          <Badge variant="outline">Nazorat qilingan</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu butunlay oʻchirib tashlanadi{" "}
                                {citizen.first_name} {citizen.last_name}
                                rekord. Bu amalni ortga qaytarib bo‘lmaydi.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Bekor qilish
                              </AlertDialogCancel>
                              <AlertDialogAction>O'chirish</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Row Content */}
                  {expandedRows.has(citizen.id) && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-4 bg-muted/50 space-y-4">
                          {/* Housing Information */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Uy-joy haqida ma'lumot
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="font-medium">Egalik:</span>{" "}
                                  {citizen.house_ownership}
                                </div>
                                <div>
                                  <span className="font-medium">Xonadon:</span>{" "}
                                  {citizen.apartment}
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Leave Records */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Leave Records ({citizen.leave.length})
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              {citizen.leave.map((leave) => (
                                <Collapsible key={leave.id}>
                                  <CollapsibleTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="w-full justify-between p-2 h-auto"
                                      onClick={() => toggleLeave(leave.id)}
                                    >
                                      <div className="text-left">
                                        <div className="font-medium">
                                          {leave.goal} - {leave.state}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {formatDate(leave.start_leave_date)}{" "}
                                          to {formatDate(leave.end_leave_date)}
                                        </div>
                                      </div>
                                      {expandedLeave.has(leave.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="space-y-2 pt-2">
                                    <Table>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell className="font-medium">
                                            Ish maydoni
                                          </TableCell>
                                          <TableCell>
                                            {leave.work_field}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">
                                            Topshirish muddati
                                          </TableCell>
                                          <TableCell>
                                            {leave.deadline}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">
                                            Qaytish sanasi
                                          </TableCell>
                                          <TableCell>
                                            {formatDate(leave.start_come_date)}{" "}
                                            - {formatDate(leave.end_come_date)}
                                          </TableCell>
                                        </TableRow>
                                        <TableRow>
                                          <TableCell className="font-medium">
                                            Status
                                          </TableCell>
                                          <TableCell>
                                            <div className="space-x-2">
                                              {getStatusBadge(
                                                leave.deport,
                                                "Deported",
                                                "Not Deported"
                                              )}
                                              {getStatusBadge(
                                                leave.violation,
                                                "Violation",
                                                "No Violation"
                                              )}
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </CollapsibleContent>
                                </Collapsible>
                              ))}
                            </CardContent>
                          </Card>

                          {/* Personal Assets */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg">
                                Shaxsiy aktivlar (
                                {citizen.personal_status.length})
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Turkum</TableHead>
                                    <TableHead>soni</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {citizen.personal_status.map((asset) => (
                                    <TableRow key={asset.id}>
                                      <TableCell className="font-medium">
                                        {asset.category}
                                      </TableCell>
                                      <TableCell>{asset.count}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
