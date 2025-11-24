
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, GridIcon, GroupIcon, HorizontaLDots, TimeIcon, UserIcon } from "./icons";
import Badge from "./components/badge";
import AverageResumeMetric from "./components/metric/average-resume-metric";
import ResumeStatistics from "./components/metric/resume-statistics";
import TotalSalaryMetric from "./components/metric/total-salary-metric";
import GraphicMetric from "./components/metric/graphic-metric";
import TeamLeaderMetric from "./components/metric/team-leader-metric";

import { useSidebar } from "./contexts/sidebar-context";
import { useTheme } from "./contexts/theme-context";

import ThemeButton from "./layouts/template1/components/theme-button";
import UserDropdown from "./layouts/template1/components/user-dropdown";
import { Link, useLocation } from "react-router-dom";
import { PATH } from "./configs";
import { DropdownField } from "./components/text-field/dropdown-field";
import { DropdownItem } from "./components/text-field/dropdown-item-field";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: PATH.ROOT,
  },
  {
    icon: <UserIcon />,
    name: "Employees",
    path: PATH.EMPLOYEE_LIST,
  },
  {
    icon: <TimeIcon />,
    name: "Leave Management",
    subItems: [
      { name: "Create", path: PATH.LEAVE_MANAGEMENT_CREATE },
      { name: "List", path: PATH.LEAVE_MANAGEMENT_LIST },
    ],
  },
];

const othersItems: NavItem[] = [];

function App() {
  const { isExpanded, isHovered, isMobileOpen, toggleSidebar, toggleMobileSidebar, setIsHovered } = useSidebar();
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);
    const { toggleTheme } = useTheme();
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{
      type: "main" | "others";
      index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
      {}
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback(
      (path: string) => location.pathname === path,
      [location.pathname]
    );

    useEffect(() => {
      let submenuMatched = false;
      ["main", "others"].forEach((menuType) => {
        const items = menuType === "main" ? navItems : othersItems;
        items.forEach((nav, index) => {
          if (nav.subItems) {
            nav.subItems.forEach((subItem) => {
              if (isActive(subItem.path)) {
                setOpenSubmenu({
                  type: menuType as "main" | "others",
                  index,
                });
                submenuMatched = true;
              }
            });
          }
        });
      });

      if (!submenuMatched) {
        setOpenSubmenu(null);
      }
    }, [location, isActive]);

    useEffect(() => {
      if (openSubmenu !== null) {
        const key = `${openSubmenu.type}-${openSubmenu.index}`;
        if (subMenuRefs.current[key]) {
          setSubMenuHeight((prevHeights) => ({
            ...prevHeights,
            [key]: subMenuRefs.current[key]?.scrollHeight || 0,
          }));
        }
      }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
      setOpenSubmenu((prevOpenSubmenu) => {
        if (
          prevOpenSubmenu &&
          prevOpenSubmenu.type === menuType &&
          prevOpenSubmenu.index === index
        ) {
          return null;
        }
        return { type: menuType, index };
      });
    };

  
    const handleToggle = () => {
      if (window.innerWidth >= 991) {
        toggleSidebar();
      } else {
        toggleMobileSidebar();
      }
    };
  
    const toggleApplicationMenu = () => {
      setApplicationMenuOpen(!isApplicationMenuOpen);
    };
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "k") {
          event.preventDefault();
          inputRef.current?.focus();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
      <ul className="flex flex-col gap-4">
        {items.map((nav, index) => (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size  ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  to={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? "menu-item-icon-active"
                        : "menu-item-icon-inactive"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );



    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    function closeDropdown() {
      setIsOpen(false);
    }

    const handleClick = () => {
      toggleDropdown();
      setNotifying(false);
    };

  
  return (
    <>
      <div className='min-h-screen xl:flex'>
        <div>
          <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
              ${
                isExpanded || isMobileOpen
                  ? "w-[290px]"
                  : isHovered
                  ? "w-[290px]"
                  : "w-[90px]"
              }
              ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`py-8 flex ${
                !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}
            >
              <Link to="/">
                {isExpanded || isHovered || isMobileOpen ? (
                  <>
                    <img
                      className="dark:hidden"
                      src="/images/logo/logo.svg"
                      alt="Logo"
                      width={150}
                      height={40}
                    />
                    <img
                      className="hidden dark:block"
                      src="/images/logo/logo-dark.svg"
                      alt="Logo"
                      width={150}
                      height={40}
                    />
                  </>
                ) : (
                  <img
                    src="/images/logo/logo-icon.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                  />
                )}
              </Link>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
              <nav className="mb-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2
                      className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                        !isExpanded && !isHovered
                          ? "lg:justify-center"
                          : "justify-start"
                      }`}
                    >
                      {isExpanded || isHovered || isMobileOpen ? (
                        "Menu"
                      ) : (
                        <HorizontaLDots className="size-6" />
                      )}
                    </h2>
                    {renderMenuItems(navItems, "main")}
                  </div>
                  <div className="">
                    <h2
                      className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                        !isExpanded && !isHovered
                          ? "lg:justify-center"
                          : "justify-start"
                      }`}
                    >
                      {isExpanded || isHovered || isMobileOpen ? (
                        "Others"
                      ) : (
                        <HorizontaLDots />
                      )}
                    </h2>
                    {renderMenuItems(othersItems, "others")}
                  </div>
                </div>
              </nav>
            </div>
          </aside>
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
        >
          <header className="sticky top-0 flex w-full bg-white border-gray-200 z-10 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
              <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                <button
                  className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
                  onClick={handleToggle}
                  aria-label="Toggle Sidebar"
                >
                  {isMobileOpen ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {/* Cross Icon */}
                </button>

                <Link to="/" className="lg:hidden">
                  <img
                    className="dark:hidden"
                    src="/images/logo/logo.svg"
                    alt="Logo"
                  />
                  <img
                    className="hidden dark:block"
                    src="/images/logo/logo-dark.svg"
                    alt="Logo"
                  />
                </Link>

                <button
                  onClick={toggleApplicationMenu}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                <div className="hidden lg:block">
                  <form>
                    <div className="relative">
                      <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                        <svg
                          className="fill-gray-500 dark:fill-gray-400"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                            fill=""
                          />
                        </svg>
                      </span>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search or type command..."
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                      />

                      <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                        <span> ⌘ </span>
                        <span> K </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className={`${
                  isApplicationMenuOpen ? "flex" : "hidden"
                } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
              >
                <div className="flex items-center gap-2 2xsm:gap-3">
                  <ThemeButton 
                    toggleTheme={toggleTheme}
                  />
                  <div className="relative">
                    <button
                      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={handleClick}
                    >
                      <span
                        className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
                          !notifying ? "hidden" : "flex"
                        }`}
                      >
                        <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
                      </span>
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <DropdownField
                      isOpen={isOpen}
                      onClose={closeDropdown}
                      className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
                        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Notification
                        </h5>
                        <button
                          onClick={toggleDropdown}
                          className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
                        {/* Example notification items */}
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-02.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block  text-theme-sm text-gray-500 dark:text-gray-400 space-x-1">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Terry Franci
                                </span>
                                <span> requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>5 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-03.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Alena Franci
                                </span>
                                <span>requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>8 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-04.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Jocelyn Kenter
                                </span>
                                <span> requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>15 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                            to="/"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-05.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-error-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Brandon Philips
                                </span>
                                <span>requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>1 hr ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                            onItemClick={closeDropdown}
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-02.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Terry Franci
                                </span>
                                <span> requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>5 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-03.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Alena Franci
                                </span>
                                <span> requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>8 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-04.jpg"
                                alt="User"
                                className="w-full overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block  space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Jocelyn Kenter
                                </span>
                                <span> requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>15 min ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
              
                        <li>
                          <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                          >
                            <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                              <img
                                width={40}
                                height={40}
                                src="/images/user/user-05.jpg"
                                alt="User"
                                className="overflow-hidden rounded-full"
                              />
                              <span className="absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-error-500 dark:border-gray-900"></span>
                            </span>
              
                            <span className="block">
                              <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Brandon Philips
                                </span>
                                <span>requests permission to change</span>
                                <span className="font-medium text-gray-800 dark:text-white/90">
                                  Project - Nganter App
                                </span>
                              </span>
              
                              <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                                <span>Project</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>1 hr ago</span>
                              </span>
                            </span>
                          </DropdownItem>
                        </li>
                        {/* Add more items as needed */}
                      </ul>
                      <Link
                        to="/"
                        className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        View All Notifications
                      </Link>
                    </DropdownField>
                  </div>
                </div>
                <UserDropdown />
              </div>
            </div>
          </header>
          <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-6 xl:col-span-7">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                  {/* <!-- Metric Item Start --> */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                      <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>

                    <div className="flex items-end justify-between mt-5">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                        Resume
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                          10
                        </h4>
                      </div>
                      <Badge color="success">
                        <ArrowUpIcon />
                        11.01%
                      </Badge>
                    </div>
                  </div>
                  {/* <!-- Metric Item End --> */}

                  {/* <!-- Metric Item Start --> */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                      <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                    </div>
                    <div className="flex items-end justify-between mt-5">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Total Employee
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                          5,359
                        </h4>
                      </div>

                      <Badge color="error">
                        <ArrowDownIcon />
                        9.05%
                      </Badge>
                    </div>
                  </div>
                  {/* <!-- Metric Item End --> */}
                </div>

                <AverageResumeMetric />
              </div>

              <div className="col-span-12 xl:col-span-5">
                <ResumeStatistics />
              </div>

              <div className="col-span-12">
                <TotalSalaryMetric />
              </div>

              <div className="col-span-12 xl:col-span-5">
                <GraphicMetric />
              </div>

              <div className="col-span-12 xl:col-span-7">
                <TeamLeaderMetric />
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
