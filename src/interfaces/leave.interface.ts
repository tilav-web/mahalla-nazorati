export interface ILeave {
  id: number;
  start_add_date: string;
  end_add_date: string;
  start_leave_date: string;
  end_leave_date: string;
  deadline: string;
  goal: string;
  work_field: string;
  state: string;
  address: string;
  start_come_date: string;
  end_come_date: string;
  reason_come: string;
  deport: boolean;
  violation: boolean;
}