"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Inbox,
  Calendar,
  Settings,
  Command,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
} from "lucide-react";


const links = [
  {
    href: "/app",
    label: "Command Center",
    icon: Command,
  },
  {
    href: "/app/inbox",
    label: "Inbox",
    icon: Inbox,
  },
  {
    href: "/app/calendar",
    label: "Calendar",
    icon: Calendar,
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: Settings,
  },
];


export function Sidebar() {

  const pathname = usePathname();


  const [collapsed,setCollapsed] =
    useState(false);



  useEffect(()=>{

    const saved =
      localStorage.getItem(
        "oneclick-sidebar"
      );


    if(saved){
      setCollapsed(
        JSON.parse(saved)
      );
    }

  },[]);



  useEffect(()=>{

    localStorage.setItem(
      "oneclick-sidebar",
      JSON.stringify(collapsed)
    );

  },[collapsed]);




  function toggleSidebar(){

    setCollapsed(
      prev=>!prev
    );

  }



  return (

    <aside
      className={`
      hidden md:flex
      flex-col
      border-r
      bg-background
      transition-all
      duration-300
      ${
        collapsed
        ? "w-16"
        : "w-64"
      }
      `}
    >



      {/* LOGO */}

      <div
        className="
        flex
        h-16
        items-center
        border-b
        px-4
        "
      >


        {!collapsed && (

          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <div
              className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-primary
              text-primary-foreground
              "
            >
              <Zap className="h-4 w-4"/>
            </div>


            <div>

              <h2 className="font-semibold">
                OneClick
              </h2>

              <p className="text-xs text-muted-foreground">
                AI Assistant
              </p>

            </div>

          </div>

        )}



        <button
          onClick={toggleSidebar}
          className="ml-auto text-muted-foreground hover:text-foreground"
        >

          {
            collapsed
            ?
            <PanelLeftOpen className="h-4 w-4"/>
            :
            <PanelLeftClose className="h-4 w-4"/>
          }

        </button>


      </div>





      {/* NAV */}

      <nav className="flex-1 p-3">


        {links.map((link)=>{


          const Icon =
            link.icon;



          const active =
            link.href === "/app"
            ? pathname === "/app"
            : pathname.startsWith(link.href);



          return (

            <Link
              key={link.href}
              href={link.href}
              title={
                collapsed
                ? link.label
                : undefined
              }

              className={`
              mb-1
              flex
              items-center
              rounded-lg
              py-2
              text-sm
              transition

              ${
                collapsed
                ?
                "justify-center"
                :
                "gap-3 px-3"
              }

              ${
                active
                ?
                "bg-primary/10 text-primary font-medium"
                :
                "hover:bg-muted"
              }
              `}
            >


              <Icon
                className="
                h-4
                w-4
                shrink-0
                "
              />



              {!collapsed && (

                <span>
                  {link.label}
                </span>

              )}


            </Link>

          );


        })}


      </nav>





      {/* FOOTER */}


      <div className="p-3">


        {!collapsed && (

          <div
            className="
            rounded-xl
            border
            bg-muted/30
            p-3
            text-xs
            text-muted-foreground
            "
          >

            <p className="font-medium text-foreground mb-1">
              Quick Tip
            </p>


            Use AI assistant to
            manage your inbox faster.


          </div>

        )}



      </div>


    </aside>


  );

}