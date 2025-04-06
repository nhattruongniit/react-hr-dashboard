import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import PageMeta from '../../components/page-meta';
import { ArrowDownIcon, ArrowUpIcon, GroupIcon } from '../../icons';
import Badge from '../../components/badge';
import AverageResumeMetric from '../../components/metric/average-resume-metric';
import ResumeStatistics from '../../components/metric/resume-statistics';
import TotalSalaryMetric from '../../components/metric/total-salary-metric';
import GraphicMetric from '../../components/metric/graphic-metric';
import TeamLeaderMetric from '../../components/metric/team-leader-metric';

function Dashboard() {
  const user = useSelector((state: RootState) => state.app.user);
  console.log('user: ', user)
  return (
    <>
      <PageMeta
        title="HR Management Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js HR Management Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

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
    </>
  )
}

export default Dashboard