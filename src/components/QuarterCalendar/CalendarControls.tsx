import CenteredContainer from "../Core/CenteredContainer"

interface IControlProps {
  handlePrev: () => void
  handleNext: () => void
  displayValue: string
}


const CalendarControls = ({handleNext, handlePrev, displayValue}: IControlProps) => {
  return (
    <CenteredContainer sx={{gap: '20px'}}>
      <button onClick={handlePrev}>Prev</button>
      <span>{displayValue}</span>
      <button onClick={handleNext}>Next</button>
    </CenteredContainer>
  )
}  

export default CalendarControls