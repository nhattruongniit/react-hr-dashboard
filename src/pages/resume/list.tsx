import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/table/table'
import { LEAVE_STATUS, LEAVE_TYPE, PATH, RESUME_STATUS } from '../../configs';
import Badge from '../../components/badge';
import { Modal } from '../../components/modal';
import { useModal } from '../../hooks/use-modal';
import SelectField from '../../components/text-field/select-field';

interface Order {
  id: number;
  firstName: string;
  lastName: string;
  appliedDate: string;
  status: string;
  email: string;
  position: string;
}

// Define the table data using the interface
const tableData: Order[] = [];
for (let i = 0; i < 9; i++) {
  let status = RESUME_STATUS.CANCELLED;
  if(i % 2 === 0) {
    status = RESUME_STATUS.PENDING;
  } 
  if (i === 3) {
    status = RESUME_STATUS.INTERVIEWED;
  }
  if (i === 4) {
    status = RESUME_STATUS.REJECTED;
  }
  tableData.push({
    id: i,
    firstName: 'Tonys',
    lastName: 'Nguyen',
    appliedDate: "2022-01-15",
    status,
    email: 'ton@gmail.com',
    position: 'Senior FE Developer'
  })
}

function ResumeList() {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='flex items-center justify-between mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Resume List
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
                      First Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Last Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                     Position
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                     Application Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                     Status
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
                  {tableData.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.firstName}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.lastName}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.position}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.appliedDate}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize">
                          <Badge color={item.status as any} variant="solid">
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Button
                            size="ssm"
                            variant="outline"
                            startIcon={<div className='fa-classic fa-solid fa-eye fa-fw' />}
                            onClick={() => navigate(PATH.RESUME_SHOW.replace(':id', item.id.toString()))}
                            className='mr-2 mb-2'
                          />
                          <Button
                            size="ssm"
                            variant="outline"
                            startIcon={<div className='fa-classic fa-solid fa-pen fa-fw' />}
                            onClick={openModal}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
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

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14 mb-7">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Status Resume
            </h4>
          </div>

        

          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
            <div className="flex-1">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Tonys
              </p>
            </div>
            <div className="flex-1 mt-3 lg:mt-0">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Nguyen
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
            <div className="flex-1">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                tony@gmail.com
              </p>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Position
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Senior FE Developer
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
            <div className="flex-1">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Application Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                12/12/2023
              </p>
            </div>
            <div className="flex-1 mt-3 lg:mt-0">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                <Badge 
                  color={RESUME_STATUS.INTERVIEWED as any}
                  variant="solid"
                  className="capitalize"
                >
                  {RESUME_STATUS.INTERVIEWED}
                </Badge>
              </p>
            </div>
          </div>
          <div className="w-full lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Change Status
            </p>
            <SelectField 
              id="resume-status"
              placeholder="Select status"
              onChange={(value) => console.log(value)}
              className='capitalize'
              options={[
                { value: RESUME_STATUS.PENDING, label: RESUME_STATUS.PENDING },
                { value: RESUME_STATUS.INTERVIEWED, label: RESUME_STATUS.INTERVIEWED },
                { value: RESUME_STATUS.REJECTED, label: RESUME_STATUS.REJECTED },
                { value: RESUME_STATUS.CANCELLED, label: RESUME_STATUS.CANCELLED },
              ]}
            />
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ResumeList;