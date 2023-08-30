import { useCallback, useState } from 'react';
import moment from 'moment';

interface IError {
  name?: string;
  start?: string;
  end?: string;
}

interface IFormData {
  name: string;
  description: string;
  start: string;
  end: string;
}

interface IProps {
  formData: IFormData;
}

const useTaskForm = ({ formData }: IProps) => {
  const [errors, setErrors] = useState<IError>({
    name: '',
    start: '',
    end: '',
  });

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors: IError = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const startDate = moment(formData.start, 'YYYY-MM-DD');
    const endDate = moment(formData.end, 'YYYY-MM-DD');

    if (!startDate.isValid()) {
      newErrors.start = 'Start Date is required';
      isValid = false;
    }

    if (!endDate.isValid()) {
      newErrors.end = 'End Date is required';
      isValid = false;
    }

    if (
      startDate.isValid() &&
      endDate.isValid() &&
      startDate.isAfter(endDate)
    ) {
      newErrors.start = 'Start Date cannot be greater than End Date';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  }, [formData.start, formData.end, formData.name]);

  return {
    errors,
    validateForm,
  };
};

export default useTaskForm;
