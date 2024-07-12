import axios, { AxiosInstance } from 'axios';

type EventObject = {
  id?: string;
  object: string;
  actor_id: string;
  actor_name: string;
  group: string;
  action: {
    id: string;
    object: string;
    name: string;
  };
  target_id: string;
  target_name: string;
  location?: string;
  occurred_at?: string;
  metadata: {
    [key: string]: string;
  };
}

type ListEventsParams = {
  actor_id?: string | null;
  target_id?: string | null;
  action_id?: string | null;
  action_name?: string;
  page?: number;
  limit?: number;
}

type getResponse = {
  status: number;
  events?: EventObject[];
  message? : string;
}

type postResponse = {
  status: number;
  event?: EventObject;
  message? : string;
}

class InstaLog {
  private api: AxiosInstance;

  constructor(private secretKey: string, private baseURL: string) {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createEvent(event: EventObject): Promise<postResponse> {
    const response = await this.api.post<postResponse>('/api/events', event);
    return response.data;
  }

  async listEvents(params: ListEventsParams): Promise<getResponse> {
    const response = await this.api.get<getResponse>('/api/events', { params });
    return response.data;
  }
}

export default InstaLog;
