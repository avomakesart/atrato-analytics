import {
  ArrowIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  PageHeader,
} from '@atrato-analytics/ui';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useCreateCardMutation,
  useCreateClientMutation,
} from '../../../generated/graphql';
import { withApollo } from '../../../utils/apollo/withApollo';
import {} from 'next/link';
import toast from 'react-hot-toast';

type CardType = {
  cardNumber: string;
  cvv: string;
  date: string;
  pin: number;
  type: string;
};

const CreateUserPage = () => {
  const [createClient] = useCreateClientMutation();
  const [createCard] = useCreateCardMutation();
  const [card, setCard] = useState<CardType>();
  const router = useRouter();

  useEffect(() => {
    const getCards = async () => {
      const response = await axios.get('http://localhost:4200/api/get-cards');
      const result = response;
      setCard(result.data);
    };

    getCards();

    return () => setCard(null);
  }, []);

  return (
    <>
      <PageHeader
        mobileDirection="row"
        align="center"
        heading={<Heading>Agregar Cliente</Heading>}
        actions={
          <Button
            colorScheme="alternative"
            leftIcon={<ArrowIcon displayDirection="left" />}
            onClick={() => router.back()}
          >
            REGRESAR
          </Button>
        }
      />

      <Formik
        initialValues={{
          firstName: '',
          secondName: '',
          lastName: '',
          secondLastName: '',
          assignedAnalyst: 'Juanito Bananas de La Rosa',
          email: '',
          phone: '',
          birthDate: '',
          status: 'PENDING',
        }}
        onSubmit={async (values) => {
          const response = await createClient({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: 'clients:{}' });
            },
          });

          const { errors: cardErrors } = await createCard({
            variables: {
              clientId:
                response.data.createClient.id && response.data.createClient.id,
              input: {
                cardNumber: card.cardNumber,
                cvv: card.cvv,
                cardProvider: card.type,
                pin: String(card.pin),
                expiryDate: String(card.date),
              },
            },
            update: (cache) => {
              cache.evict({ fieldName: 'cards:{}' });
            },
          });

          if (!response.errors && !cardErrors) {
            toast.success('Cliente creado correctamente');
            setTimeout(() => router.push('/', null, { shallow: true }), 3000);
          }
        }}
        // validationSchema={userValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, handleChange, values, errors: formikErrors }) => (
          <Form>
            <div className="mt-10">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="pr-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Información Personal
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                      Bien, aquí vamos, necesitaremos completar los datos
                      personales del usuario, como nombre, apellido, etc.
                      necesitamos completar el contacto y detalles adicionales
                      para el usuario
                    </p>
                  </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 max-w-5xl mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.firstName?.length > 0}
                          >
                            <FormLabel>Nombre</FormLabel>
                            <Input
                              type="text"
                              name="firstName"
                              onChange={handleChange}
                              value={values.firstName}
                            />
                            {!formikErrors.firstName ? (
                              <FormHelperText>
                                El nombre del cliente, ej: Juan
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.firstName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.secondName?.length > 0}
                          >
                            <FormLabel>Segundo nombre</FormLabel>
                            <Input
                              type="text"
                              name="secondName"
                              onChange={handleChange}
                              value={values.secondName}
                            />
                            {!formikErrors.secondName ? (
                              <FormHelperText>
                                El segundo nombre del usuario, ej: Enrique
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.secondName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.lastName?.length > 0}
                          >
                            <FormLabel>Apellido</FormLabel>
                            <Input
                              type="text"
                              name="lastName"
                              onChange={handleChange}
                              value={values.lastName}
                            />
                            {!formikErrors.lastName ? (
                              <FormHelperText>
                                El apellido del usuario, ej: Carrillo
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.lastName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.secondLastName?.length > 0}
                          >
                            <FormLabel>Segundo apellido</FormLabel>
                            <Input
                              type="text"
                              name="secondLastName"
                              onChange={handleChange}
                              value={values.secondLastName}
                            />
                            {!formikErrors.secondLastName ? (
                              <FormHelperText>
                                El segundo apellido del usuario, ej: Gonzalez
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.secondLastName}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-10">
                <div className="border-t border-gray-200"></div>
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="pr-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Detalles extra
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
                      Ahora necesitamos completar el contacto y los detalles
                      adicionales para el usuario.
                    </p>
                  </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 max-w-5xl mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.email?.length > 0}
                          >
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              value={values.email}
                            />
                            {!formikErrors.email ? (
                              <FormHelperText>
                                El correo electrónico del usuario, ej:
                                juang33@gmail.com
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.email}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <FormControl
                            isInvalid={formikErrors.phone?.length > 0}
                          >
                            <FormLabel>Teléfono</FormLabel>
                            <Input
                              type="tel"
                              name="phone"
                              onChange={handleChange}
                              value={values.phone}
                            />
                            {!formikErrors.phone ? (
                              <FormHelperText>
                                El teléfono del usuario, ej: 3315726878
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.phone}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <FormControl
                            isInvalid={formikErrors.phone?.length > 0}
                          >
                            <FormLabel>Fecha de nacimiento</FormLabel>
                            <Input
                              type="date"
                              name="birthDate"
                              onChange={handleChange}
                              value={values.birthDate}
                            />
                            {!formikErrors.phone ? (
                              <FormHelperText>
                                La fecha de nacimiento del usuario, ej:
                                dd/mm/yyyy
                              </FormHelperText>
                            ) : (
                              <FormErrorMessage>
                                {formikErrors.phone}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        </div>
                      </div>

                      <div className="flex justify-end mt-10">
                        <Button type="submit" isLoading={isSubmitting}>
                          AGREGAR
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withApollo({ ssr: false })(CreateUserPage);
