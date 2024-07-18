import Feed from "../assets/SidebarIcons/feed.png";
import Home from "../assets/SidebarIcons/home.png";
import Health from "../assets/SidebarIcons/health.png";
import Milk from "../assets/SidebarIcons/milk.png";
import Sensor from "../assets/SidebarIcons/sensor.png";

const MENU_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboards",
    isTitle: false,
    url: "/",
    icon: Home,
  },
  {
    key: "milk",
    label: "Milk",
    isTitle: false,
    url: "/milk",
    icon: Milk,
  },
  {
    key: "sensor",
    label: "Sensor",
    isTitle: false,
    url: "/sensor",
    icon: Sensor,
  },
  {
    key: "feed",
    label: "Feed",
    isTitle: false,
    icon: Feed,
    children: [
      {
        key: "feed-management",
        label: "Feed Management",
        url: "/feed/management",
        parentKey: "feed",
      },
      {
        key: "feed-expenses",
        label: "Feed Expenses",
        url: "/feed/expenses",
        parentKey: "feed",
      },
    ],
  },
  {
    key: "health",
    label: "Health",
    isTitle: false,
    icon: Health,
    children: [
      {
        key: "health-management",
        label: "Health Management",
        url: "/health/management",
        parentKey: "health",
      },
      {
        key: "health-expenses",
        label: "Health Expenses",
        url: "/health/expenses",
        parentKey: "health",
      },
    ],
  },
];

export { MENU_ITEMS };
