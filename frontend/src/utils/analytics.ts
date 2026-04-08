import ReactGA from "react-ga4";

type EventParams = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const trackEvent = ({ category, action, label, value }: EventParams) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};