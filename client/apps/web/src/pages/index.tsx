import {
  Button,
  CheckIcon,
  ChevronIcon,
  ErrorPage,
  Heading,
  PageHeader,
  PageLoader,
  PlusIcon,
  SearchBar,
  UserList,
  UserListAddButton,
  UserListContainer,
} from '@atrato-analytics/ui';
import { Listbox, Transition } from '@headlessui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useClientsQuery } from '../generated/graphql';
import { withApollo } from '../utils/apollo/withApollo';

const sortOptions = [
  { id: 1, name: 'id', label: 'By id' },
  { id: 2, name: 'firstName', label: 'By name' },
];

const clientStatuses = [
  { id: 1, name: 'PENDING', label: 'PENDIENTE' },
  { id: 2, name: 'INPROGRESS', label: 'EN PROCESO' },
  { id: 3, name: 'COMPLETED', label: 'COMPLETADO' },
];

function Index() {
  const [states, setStates] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortedBy, setSortedBy] = useState<string>('id');
  const [sortedClients, setSortedClients] = useState([]);
  const [filterText, setFilterText] = useState('');

  const { data, loading, error } = useClientsQuery({
    variables: { cursor: null, limit: 30 },
  });

  console.log(states);

  const clientData = data?.clients?.clients;

  useEffect(() => {
    const newUserArr = [].concat(clientData);

    const sortedUser =
      sortedBy === 'firstName'
        ? newUserArr.sort(
            (a: { firstName: string }, b: { firstName: string }) => {
              if (a.firstName < b.firstName) return -1;
              if (a.firstName > b.firstName) return 1;
              else return 0;
            }
          )
        : newUserArr.sort(
            (a: { id: number }, b: { id: number }) => a.id - b.id
          );

    if (sortedUser) setSortedClients(sortedUser);
  }, [clientData, sortedBy]);

  const rows = [];

  sortedClients?.forEach((client) => {
    if (
      client?.firstName.toLowerCase().indexOf(filterText.toLowerCase()) ===
        -1 &&
      client?.lastName.toLowerCase().indexOf(filterText.toLowerCase()) === -1
    ) {
      return;
    }

    if (client?.status.indexOf(selectedStatus) === -1) return;
    rows.push(
      <UserList
        onMouseEnter={() => {
          setStates((states) => [...states, 'item-hover']);
        }}
        onMouseLeave={() => {
          setStates((states) => states.filter((x) => x !== 'item-hover'));
        }}
        client={client}
        key={client?.id}
      />
    );
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <PageHeader
        heading={<Heading>Todos los clientes</Heading>}
        actions={
          <Button className="hidden lg:inline-flex" leftIcon={<PlusIcon />}>
            <NextLink href="/user/create"> AGREGAR CLIENTE </NextLink>
          </Button>
        }
      />

      <div className="flex flex-col-reverse lg:flex-row items-start mt-12 mb-4 w-full">
        <div className="w-full mt-4 z-10 lg:w-40 lg:mt-0">
          <Listbox value={sortedBy} onChange={setSortedBy}>
            {({ open }) => (
              <>
                <Listbox.Button
                  as={Button}
                  colorScheme="alternative"
                  rightIcon={
                    <ChevronIcon displayDirection={open ? 'up' : 'down'} />
                  }
                  iconSpaceLeft="auto"
                  className="w-full uppercase lg:w-auto"
                >
                  Ordenar
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
                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {sortOptions.map((option) => (
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
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        </div>

        <div className="w-full mt-6 z-10 lg:w-40 lg:mt-0">
          <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            {({ open }) => (
              <>
                <Listbox.Button
                  as={Button}
                  colorScheme="alternative"
                  rightIcon={
                    <ChevronIcon displayDirection={open ? 'up' : 'down'} />
                  }
                  iconSpaceLeft="auto"
                  className="w-full uppercase lg:w-auto"
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
                    className="absolute mt-1 max-h-60 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <Listbox.Option
                      key="reset"
                      value=""
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer ${
                          active
                            ? 'bg-orange-100 text-orange-900'
                            : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            DEFAULT
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                    {clientStatuses.map((option) => (
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
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-400">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        </div>

        <SearchBar
          onFocus={() => {
            setStates((states) => [...states, 'input-focus']);
          }}
          onBlur={() => {
            setStates((states) => states.filter((x) => x !== 'input-focus'));
            // resetScroll()
          }}
          filterText={filterText}
          onFilterTextChange={setFilterText}
        />
      </div>

      <UserListContainer>
        {rows}
        <UserListAddButton
          onMouseEnter={() => {
            setStates((states) => [...states, 'new-hover']);
          }}
          onMouseLeave={() => {
            setStates((states) => states.filter((x) => x !== 'new-hover'));
          }}
        />
      </UserListContainer>
    </div>
  );
}

export default withApollo({ ssr: false })(Index);
