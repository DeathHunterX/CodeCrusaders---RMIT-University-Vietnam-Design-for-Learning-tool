import ModuleCard from "./Card"
import ModulePieChart from "./PieChart"

const ModuleDashboard = () => {
  const data = [
    {
      id: "ruby",
      label: "ruby",
      value: 198,
      color: "hsl(252, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 473,
      color: "hsl(266, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 207,
      color: "hsl(81, 70%, 50%)",
    },
  ];
  return (
    <div className="module_dashboard">
      <div className="d-flex moudule-cards ">
        <ModuleCard title="Pre-Class" number="12" numberDuration="120" />
        <ModuleCard title="In-Class" number="10" numberDuration="120" />
        <ModuleCard title="Post-Class" number="10" numberDuration="120" />
      </div>

      <div className="d-flex module-pie">
        <div className="module-pie-detail">
          <ModulePieChart data={data} />
        </div>
        <div className="module-pie-detail">
          <ModulePieChart data={data} />
        </div>
        <div className="module-pie-detail">
          <ModulePieChart data={data} />
        </div>
      </div>
    </div>
  )
}

export default ModuleDashboard