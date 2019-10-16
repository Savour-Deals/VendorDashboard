declare interface PageRoute {
    path: string;
    name: string;
    icon: string;
    component: React.FC;
    layout: string;
}