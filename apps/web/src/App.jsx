import MortgageInfoForm from "./components/MortgageInfoForm"
import { MortgageProvider } from "./context/MortgageContext"

export default function App() {
  return (
    <MortgageProvider>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="flex my-20">
            <MortgageInfoForm/>
          </div>
        </div>
      </div>
    </MortgageProvider>
  )
}
