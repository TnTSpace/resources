// Reexport your entry components here
export { default as SpinLoader } from "./components/widgets/SpinLoader.svelte"
export { default as CloudinaryApiFileUpload } from './components/widgets/CloudinaryApiFileUpload.svelte'
export { default as CloudinaryApiImageUploadBtn } from './components/widgets/CloudinaryApiImageUploadBtn.svelte'
export { default as Tiptap } from '../widgets/editor/Tiptap.svelte'
export { default as DataTable } from './components/widgets/table/DataTable.svelte'
export { default as Date } from './components/widgets/table/comps/Date.svelte'
export { default as Gender } from './components/widgets/table/comps/Gender.svelte'
export { default as Image } from './components/widgets/table/comps/Image.svelte'
export { default as Name } from './components/widgets/table/comps/Name.svelte'
export { default as DataTableNameSorting } from './components/widgets/table/data-name-sorting.svelte'
export { default as DataTableActions } from './components/widgets/table/data-table-actions.svelte'
export { default as Footer } from "./components/widgets/Footer.svelte"
export { default as TelInput } from "./components/widgets/TelInput.svelte"
export { default as AlertWidget } from "./components/widgets/AlertWidget.svelte"
export { default as UploadWidget } from "./components/widgets/upload/UploadWidget.svelte"
export { default as Educational } from "./components/widgets/Educational.svelte"
export { UploadType } from "./constants/index.js"
// import { renderComponent } from "$lib/components/ui/data-table/index.js";
export { renderComponent } from './components/ui/data-table/index.js'
export type { TStatus, TUpload, iCloudinaryInfo, iMedia, iStatus, iUploadResource, iItem, iPhone, iParent, iSection } from "./interface/index.js"