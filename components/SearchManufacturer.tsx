"use client";

import React, { useState, Fragment } from "react";

import { SearchManufacturerProps } from "@/types";
// to use this ui lib, you need to declare this component as a client component
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";

import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState<string>("");

  // secondary state that depends on query state
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((manufacturer) =>
          manufacturer
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          {/* part1 */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          {/* part2: the input bar */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

          {/*  part3: drop down list */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredManufacturers.map((manufacturer) => (
                <Combobox.Option
                  key={manufacturer}
                  // active is from ui lib
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={manufacturer}
                >
                  {/* selected, active are render props for ComboBox.Option, active is whether mouse hover on, selected is whether the option is selected (mouse click) */}
                  {({ selected, active }) => {
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {manufacturer}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            S
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
