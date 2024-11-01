export interface MoodsState {
  listofmoods: {
    icon: 'icon-happy' | 'icon-neutral' | 'icon-sad' | 'icon-stress';
    id: number;
    name: string;
    color: string;
    colorBg: string;
  }[];
  moodData: IPayload[];
  modeChart: 'pie' | 'bar';
  loading: boolean
}

export interface IPayload {
    moodName: string;
    timestamp: string | null;
    color: string;
    icon: 'icon-happy' | 'icon-neutral' | 'icon-sad' | 'icon-stress';
}
