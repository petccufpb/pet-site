declare module "sdc" {
  export type SDCEventData = {
    id: string;
    name: string;
    about: string | null;
    type: string;
    capacity?: number;
    extraCapacity: number;
    onSite: boolean;
    location: string;
    startTime: string;
    endTime: string;
    speakerId: string;
    editionId: string;
    createdAt: string;
    updatedAt: string;
    participants: any[];
    speaker: {
      id: string;
      name: string;
      email: string;
      photoUrl: string;
      createdAt: string;
      updatedAt: string;
    };
  };

  export type SDCScheduleData = {
    id: string;
    name: null | string;
    number: number;
    date: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
    certificateTemplate: null | any; // replace any with the correct type
    events: SDCEventData[];
    capacity: number;
    participants: any[];
  };
}
