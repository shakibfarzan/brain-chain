import { AppParams } from '@/types';
import { useParams } from 'next/navigation';

/**
 * Custom hook to retrieve application parameters.
 * @returns {AppParams} The application parameters.
 */
const useAppParams = (): AppParams => useParams<AppParams>();

export default useAppParams;
