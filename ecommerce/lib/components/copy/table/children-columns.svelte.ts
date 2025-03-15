import { renderComponent } from "$lib/components/ui/data-table/index.js";

import type { ColumnDef } from "@tanstack/table-core";
import { getAge } from "@toolsntuts/utils";
import Name from "./comps/Name.svelte";
import DataTableActions from "../table/data-table-actions.svelte";
import DataNameSorting from "../table/data-name-sorting.svelte";
import type { iChild } from "$lib/interface/index.js";


const getChildAge = (birthday: string) => {
  const age = getAge(birthday)
  return age >= 2 ? `${age} years` : `year`
}

const onview = (id: string) => {
  console.log("on view = clicked", id)
}

const onedit = (id: string) => {
  console.log("on edit = clicked", id)
}

const ondelete = (id: string) => {
  console.log("on delete = clicked", id)
}

export const childrenColumns: ColumnDef<iChild>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return renderComponent(DataNameSorting, {
        onclick: () => {
          console.log("clicking sort")
          return column.toggleSorting(column.getIsSorted() === 'asc')
        }
      })
    },
    cell: ({ row }) => {
      return renderComponent(Name, { top: row.original.name, bottom: getChildAge(row.original.birthday), image: row.original.image.secure_url })
    }
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "codeName",
    header: "Code Name"
  },
  {
    accessorKey: "birthday",
    header: "Birthday"
  },
  {
    accessorKey: "father",
    header: "Father",
    cell: ({ row }) => {
      return renderComponent(Name, { top: row.original.name, bottom: 'Father', image: row.original.image.secure_url })
    }
  },
  {
    accessorKey: "mother",
    header: "Mother",
    cell: ({ row }) => {
      return renderComponent(Name, { top: row.original.name, bottom: 'Mother', image: row.original.image.secure_url })
    }
  },
  {
    accessorKey: "location",
    header: "Location"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.id, onview, onedit, ondelete })
    }
  }
]