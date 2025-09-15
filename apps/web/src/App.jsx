import MortgageInfoForm from "./components/MortgageInfoForm"
import MortgageDashboard from "./components/MortgageDashboard"
import { MortgageProvider } from "./context/MortgageContext"

export default function App() {
  return (
    <MortgageProvider>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col md:flex-row gap-6 my-20">
            <div className="flex items-start">
              <MortgageInfoForm/>
            </div>
            <div className="flex items-start">
              <MortgageDashboard/>
            </div>
          </div>
        </div>
      </div>
    </MortgageProvider>
  )
}
