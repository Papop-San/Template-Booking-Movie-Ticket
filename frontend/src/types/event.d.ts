export interface apiResponse<T> {
  status: string;
  data: T;
}

export interface Event {
  id: number;
  name: string;
  capacity: number;
  created_at: string; 
  updated_at: string; 
}

