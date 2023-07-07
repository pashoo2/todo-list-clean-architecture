import {
    DTOCustomerEntityToEntityImpl,
    DTOCustomerEntityFromEntityImpl,
    type OperationResult,
    type CustomerEntityRepositoryList,
    CustomerEntityRepositoryListFilter,
    ListFromStorage,
    DTOCustomerEntity,
  } from '@react-node-monorepo/application';
  import { CustomerEntityImpl } from '@react-node-monorepo/domain';
  import {
    type HttpError,
    OperationResultByHttpError,
    RestAPIRequestDescriptionCustomerList,
    CustomerEntityRestAPIResponseListPayload,
  } from "@react-node-monorepo/infrastructure";

  import { type RestAPIService } from "../../services";
    
  export class CustomerEntityRepositoryListImpl implements CustomerEntityRepositoryList {
    // TODO: use Dependency Injection
    protected _dtoCustomerEntityToEntityImpl = new DTOCustomerEntityToEntityImpl();

    constructor(
      protected _restAPIService: RestAPIService,
    ) {}

    public async read(filter: CustomerEntityRepositoryListFilter): Promise<OperationResult<ListFromStorage<CustomerEntityImpl>>> {
      const filterQuery: string = filter.toQuery()
      const request = new RestAPIRequestDescriptionCustomerList(filterQuery as any) // TODO: resolve any
  
      try {
          const response = await this._restAPIService.sendRequest(request as any) as CustomerEntityRestAPIResponseListPayload;

          return {
              isSuccess: true,
              result: {
                  ...response,
                  values: response.values.map(this.$createCustomerEntityFromDTO)
              }
          }
      } catch(err) {
          return this._getOperationResult(err)
      }
    }

    protected _getOperationResult(err): OperationResult<typeof err> {
      return new OperationResultByHttpError(err as Error | HttpError);
    }

    private $createCustomerEntityFromDTO = (customerDTO: DTOCustomerEntity): CustomerEntityImpl => this._dtoCustomerEntityToEntityImpl.derive(customerDTO)
  }
    