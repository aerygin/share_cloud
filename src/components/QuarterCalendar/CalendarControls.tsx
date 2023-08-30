import { Button, Flex } from '../Core';

interface IControlProps {
  handlePrev: () => void;
  handleNext: () => void;
  displayValue: string;
}

const CalendarControls = ({
  handleNext,
  handlePrev,
  displayValue,
}: IControlProps) => {
  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <h1>Quarter calendar</h1>
      <Flex
        sx={{ justifyContent: 'center', gap: '20px', alignItems: 'center' }}
      >
        <Button onClick={handlePrev}>&#8592;</Button>
        <strong>{displayValue}</strong>
        <Button onClick={handleNext}>&#8594;</Button>
      </Flex>
    </Flex>
  );
};

export default CalendarControls;
