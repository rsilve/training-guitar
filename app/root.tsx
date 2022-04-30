import type {MetaFunction} from "remix";
import {
    Links,
    LinksFunction,
    LiveReload,
    LoaderFunction,
    Meta,
    Outlet,
    redirect,
    Scripts,
    ScrollRestoration,
} from "remix";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Training Guitar",
    viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url);
    if (url.pathname === "/") {
        const now = new Date();
        return redirect(`/activities/${now.getFullYear()}/${now.getMonth() + 1}`);
    }
    return null;
};


export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <div className="main"><Outlet/></div>

        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
