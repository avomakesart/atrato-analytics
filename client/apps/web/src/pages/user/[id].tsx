import {
  ArrowIcon,
  Button,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  DotsHorizontalIcon,
  ErrorPage,
  Heading,
  PageHeader,
  PageLoader,
  PencilIcon,
  Size,
  TrashIcon,
  UserCard,
  useWindowSize,
} from '@atrato-analytics/ui';
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useCardsQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useUpdateClientStatusMutation,
} from '../../generated/graphql';
import { statuses, useGetClientFromUrl, useGetIntId } from '../../utils';
import { withApollo } from '../../utils/apollo/withApollo';

const UserPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();
  const [updateClient] = useUpdateClientMutation();
  const [updateClientStatus] = useUpdateClientStatusMutation();
  const { data, loading, error } = useGetClientFromUrl();
  const intId = useGetIntId();
  const { data: cardData } = useCardsQuery({
    variables: { cursor: null, limit: 10 },
  });
  const [deleteClient] = useDeleteClientMutation();

  const size: Size = useWindowSize();

  const clientInfo = data?.client;

  const cardInfo = cardData?.cards.cards;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardDetails: any = cardInfo
    ?.filter((val) => val.clientId === data?.client.id)
    .map((card) => {
      return {
        cardNumber: card.cardNumber,
        cvv: card.cvv,
        pin: card.pin,
        exp: card.expiryDate,
      };
    });

  const renderDesktopEditButton = (loading) => {
    if (isEditing) {
      return (
        <div className="flex items-center">
          <Button
            colorScheme="alternative"
            className="uppercase"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" className="uppercase ml-4" isLoading={loading}>
            Guardar
          </Button>
        </div>
      );
    }

    return (
      <Button
        colorScheme="alternative"
        className="uppercase bg-transparent border-transparent"
        rightIcon={<PencilIcon />}
        onClick={() => setIsEditing(!isEditing)}
      >
        Editar
      </Button>
    );
  };

  const renderMobileEditButton = (loading) => {
    if (isEditing) {
      return (
        <div className="flex flex-col-reverse lg:flex-row">
          <Button
            colorScheme="alternative"
            className="bg-transparent border-transparent"
            type="submit"
            isLoading={loading}
          >
            <CheckIcon />
          </Button>
          <Button
            colorScheme="alternative"
            className="bg-transparent border-transparent"
            onClick={() => setIsEditing(false)}
          >
            <CloseIcon />
          </Button>
        </div>
      );
    }

    return (
      <Button
        colorScheme="alternative"
        className="bg-transparent border-transparent"
        onClick={() => setIsEditing(!isEditing)}
      >
        <PencilIcon />
      </Button>
    );
  };

  const handleSelectStatus = async (e: string) => {
    setSelectedStatus(e);
    const { errors } = await updateClientStatus({
      variables: {
        id: data?.client.id,
        status: e,
      },
    });

    if (!errors) return toast.success('Estatus actualizado correctamente.');
  };

  const renderStatusButton = () => {
    return (
      <div className="mt-4 z-10  lg:mt-0">
        <Listbox value={selectedStatus} onChange={handleSelectStatus}>
          {({ open }) => (
            <>
              <Listbox.Button
                as={Button}
                rightIcon={
                  <ChevronIcon displayDirection={open ? 'up' : 'down'} />
                }
                iconSpaceLeft="auto"
                className="w-full lg:w-auto uppercase"
              >
                Estatus
              </Listbox.Button>

              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute mt-1 max-h-60 w-42 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  onChange={(e) => console.log(e)}
                >
                  {statuses.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      value={option.name}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer ${
                          active
                            ? 'bg-orange-100 text-orange-900'
                            : 'text-gray-900'
                        }`
                      }
                    >
                      <>
                        <span
                          className={`block truncate ${
                            data?.client.status === option.name
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {data?.client.status === option.name ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
    );
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorPage />;

  return (
    <>
      <PageHeader
        align="center"
        heading={
          isEditing ? (
            <>
              <Heading>Editor Mode</Heading>
              <div className="mt-2">
                <span>ID del Cliente:</span>
                <span className="bg-blue-950 rounded-md px-3 py-1 ml-2 font-bold">
                  {clientInfo?.id}
                </span>
              </div>
            </>
          ) : (
            <Heading>Detalles del Cliente</Heading>
          )
        }
        actions={
          <div className="flex items-center">
            <Button
              colorScheme="alternative"
              leftIcon={<ArrowIcon displayDirection="left" />}
              onClick={() => router.back()}
            >
              REGRESAR
            </Button>

            <div className="flex justify-end w-full text-right">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button as={Button} leftIcon={<DotsHorizontalIcon />}>
                    OPCIONES
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-blue-950 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            <PencilIcon
                              className="mr-2 h-5 w-5 text-blue-1000"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-blue-950 text-white'
                                : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() =>
                              setIsConfirmDialogOpen(!isConfirmDialogOpen)
                            }
                          >
                            <TrashIcon
                              className="mr-2 h-5 w-5 text-blue-1000"
                              aria-hidden="true"
                            />
                            Borrar
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        }
      />

      <Transition appear show={isConfirmDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsConfirmDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    ¿Estas seguro de borrar este cliente?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Una ves haciendo clic en confirmar, no podras recuperar la
                      información del cliente.
                    </p>
                  </div>

                  <div className="flex justify-end items-center mt-4">
                    <Button
                      type="button"
                      colorScheme="alternative"
                      onClick={() => setIsConfirmDialogOpen(false)}
                    >
                      Cancelar
                    </Button>

                    <Button
                      type="button"
                      colorScheme="red"
                      onClick={() => {
                        deleteClient({
                          variables: { id: Number(clientInfo.id) },
                          update: (cache) => {
                            cache.evict({ id: 'Client:' + intId });
                          },
                        });
                        router.push('/');
                      }}
                    >
                      Borrar
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="pt-6 flex justify-center">
        <Formik
          initialValues={{
            firstName: clientInfo?.firstName,
            secondName: clientInfo?.secondName,
            lastName: clientInfo?.lastName,
            secondLastName: clientInfo?.secondLastName,
            email: clientInfo?.email,
            birthDate: clientInfo?.birthDate,
            phone: clientInfo?.phone,
          }}
          onSubmit={async (values) => {
            const { errors } = await updateClient({
              variables: { id: intId, input: values },
            });

            if (!errors) {
              toast.success('Cliente actualizado correctamente.');
              setIsEditing(false);
            }
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className="flex justify-center w-full">
              <UserCard
                isEditing={isEditing}
                user={{
                  id: data?.client.id,
                  firstName: values.firstName,
                  secondName: values.secondName,
                  lastName: values.lastName,
                  secondLastName: values.secondLastName,
                  email: values.email,
                  birthDate: dayjs(new Date(values.birthDate)).format(
                    'DD/MM/YYYY'
                  ),
                  phone: values.phone,
                  assignedAnalyst: data?.client.assignedAnalyst,
                }}
                cardDetails={cardDetails}
                onChange={handleChange}
                actions={
                  size.width > 1024
                    ? renderStatusButton()
                    : renderMobileEditButton(isSubmitting)
                }
                footer={
                  size.width > 1024
                    ? renderDesktopEditButton(isSubmitting)
                    : renderStatusButton()
                }
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default withApollo({ ssr: false })(UserPage);
