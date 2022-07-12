import { Heading } from '../heading';
import { Text } from '../text';

export const ErrorPage = () => {
  return (
    <div className="flex justify-center py-40">
      <div className="flex flex-col">
        <Heading>Ups algo salio mal {`:(`} </Heading>
        <Text className="mt-4">Intenta recargar la pagina en un momento</Text>
      </div>
    </div>
  );
};
