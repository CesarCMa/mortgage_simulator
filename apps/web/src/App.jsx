import MortgageInfoForm from "./components/MortgageInfoForm"
import MortgageDashboard from "./components/MortgageDashboard"
import { MortgageProvider } from "./context/MortgageContext"

export default function App() {
  return (
    <MortgageProvider>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-20">
            <MortgageInfoForm/>
            <MortgageDashboard/>
          </div>
        </div>
      </div>
    </MortgageProvider>
  )
}
