import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table/table";

// Define the TypeScript interface for the table rows
interface Team {
  id: number;
  name: string; 
  email: string; 
  team: string;
  numberOfMembers: number; 
  image: string;
}

// Define the table data using the interface
const tableData: Team[] = [
  {
    id: 1,
    name: "Tony, Nguyen",
    email: "tony@gmail.com",
    team: "FE Developer",
    numberOfMembers: 5,
    image: "/images/user/user-01.jpg"
  },
  {
    id: 2,
    name: "Henry, Arthur",
    email: "henry@gmail.com",
    team: "BE Developer",
    numberOfMembers: 34,
    image: "/images/user/user-02.jpg"
  },
  {
    id: 3,
    name: "Jesica, Nguyen",
    email: "jesica@gmail.com",
    team: "Marketing",
    numberOfMembers: 50,
    image: "/images/user/user-03.jpg"
  },
  {
    id: 4,
    name: "Black, Melvin",
    email: "black@gmail.com",
    team: "Sales",
    numberOfMembers: 203,
    image: "/images/user/user-04.jpg"
  },
  {
    id: 5,
    name: "Cooper, Kristin",
    email: "tony@gmail.com",
    team: "Accounting",
    numberOfMembers: 3,
    image: "/images/user/user-05.jpg"
  },
];

export default function TeamLeader() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Team Leader
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Number of Members
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((item) => (
              <TableRow key={item.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        className="h-[50px] w-[50px]"
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {item.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {item.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.team}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {item.numberOfMembers}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
