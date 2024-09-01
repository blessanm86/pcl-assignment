type Order = {
  _id: string;
  courier: Courier;
  tracking_number: string;
  created: string;
  updated: string;
  checkpoints: Checkpoint[];
  delivery_info: DeliveryInfo;
  destination_country_iso3: string;
  zip_code: string;
};

type Courier = 'dhl' | 'ups';

type Checkpoint = {
  status_details: string;
  event_timestamp: string;
  status:
    | 'Registered'
    | 'In transit'
    | 'Failed delivery attempt'
    | 'New delivery date set'
    | 'Ready for collection';
  country_iso3: 'USA' | 'DEU';
  city: 'Knoxville' | 'Munich' | 'Hamburg';
  meta?: DeliveryMeta | PickupMeta;
};

type DeliveryMeta = {
  delivery_date: string;
  delivery_time_frame_from: string;
  delivery_time_frame_to: string;
};

type PickupMeta = {
  pickup_address: string;
  pickup_address_link: string;
  pickup_address_map_url: string;
};

type DeliveryInfo = {
  articles: Article[];
  orderNo: string;
  order_date: string;
  recipient: string;
  recipient_notification: string;
  email: string;
  street: string;
  city: string;
  region: string;
  timezone: string;
  announced_delivery_date: string;
};

type Article = {
  articleNo: string;
  articleName: string;
  articleImageUrl?: string;
  quantity: number;
  price: number;
};
