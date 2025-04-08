import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/table/table'
import { randomId } from '../../utils/randomId';
import { PATH } from '../../configs';

interface Order {
  id: number;
  employeeId: string;
  user: {
    image: string;
    name: string;
    role: string;
  };
  team: string;
  role: string;
  joinDate: string;
}

// Define the table data using the interface
const tableData: Order[] = [];
for (let i = 0; i < 9; i++) {
  tableData.push({
    id: i,
    employeeId: randomId().toString(),
    user: {
      image: `/images/user/user-0${i + 1}.jpg`,
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    role: 'FE Developer',
    joinDate: "2022-01-15",
    team: "Agency Website",
  })
}

function EmployeeList() {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='flex items-center justify-between mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Employee List
          </h3>
          <div className='flex items-center gap-3'>
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
                type="text"
                placeholder="Type..."
                className="dark:bg-dark-900 h-9 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[250px]"
              />
            </div>
            <Button
              size="ssm"
              variant="primary"
              startIcon={<div className='fa-classic fa-solid fa-plus fa-fw' />}
              onClick={() => navigate(PATH.EMPLOYEE_CREATE)}
            >
              Create
            </Button>
          </div>
         
        </div>
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Employee ID
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Team
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Role
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Join Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {tableData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img
                              width={40}
                              height={40}
                              src={item.user.image}
                              alt={item.user.name}
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {item.user.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {item.user.role}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.employeeId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.team}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.role}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.joinDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Button
                          size="ssm"
                          variant="outline"
                          startIcon={<div className='fa-classic fa-solid fa-eye fa-fw' />}
                          onClick={() => navigate(PATH.EMPLOYEE_SHOW.replace(':id', item.id.toString()))}
                          className='mr-2 mb-2'
                        />
                        <Button
                          size="ssm"
                          variant="outline"
                          startIcon={<div className='fa-classic fa-solid fa-pen fa-fw' />}
                          onClick={() => navigate(PATH.EMPLOYEE_EDIT.replace(':id', item.id.toString()))}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-3">
        <div className="text-sm text-slate-500">
          Showing <b>1-5</b> of 45
        </div>
        <div className="flex space-x-1">
          <Button
            size="ssm"
            variant="outline"
          >
            Prev
          </Button>
          <Button
            size="ssm"
            variant="outline"
            className='px-3 min-w-9 min-h-9'
            active
          >
            1
          </Button>
          <Button
            size="ssm"
            variant="outline"
            className='px-3 min-w-9 min-h-9'
          >
            2
          </Button>
          <Button
            size="ssm"
            variant="outline"
            className='px-3 min-w-9 min-h-9'
          >
            3
          </Button>
          <Button
            size="ssm"
            variant="outline"
          >
            Next
          </Button>
        </div>
    </div>
    </>
  )
}

export default EmployeeList