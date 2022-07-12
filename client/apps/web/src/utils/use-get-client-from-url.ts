import { useClientQuery } from '../generated/graphql';
import { useGetIntId } from './use-get-int-id';

export const useGetClientFromUrl = () => {
  const intId = useGetIntId();
  return useClientQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
