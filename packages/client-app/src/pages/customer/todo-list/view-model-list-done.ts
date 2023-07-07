import { action, computed, observable } from "mobx";
import { type TodoItemAggregate } from "@react-node-monorepo/domain";

import { appState } from '../../../application';
import { CustomerPageTodoItemsViewModelList } from "./view-model-list";

export class CustomerPageTodoItemsViewModelListDone extends CustomerPageTodoItemsViewModelList {}
