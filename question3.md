## **React FC usage of HOC**
The code refractor here makes use of an existing HOC implementation in the HeyAuto repo

### **Usage of DispatchInjectorExporter**
Refractor made to the following file: `packages/ha-admin/src/dealership-sales-updates/containers/CreateEditDealershipSalesUpdateContainer.tsx`

### **Before Refractor**
```
const CreateEditDealershipSalesUpdateContainer = ({
    salesUpdate,
    fkDealershipId,
    fkUserId,
}: {
    readonly salesUpdate?: DealershipSalesUpdate;
    readonly fkDealershipId: number;
    readonly fkUserId?: number;
}) => {
    const dispatch = useDispatch();
```

### **After Refractor**
```
interface ICreateEditDealershipSalesUpdateContainer {
    readonly salesUpdate?: DealershipSalesUpdate;
    readonly fkDealershipId: number;
    readonly fkUserId?: number;
}

const CreateEditDealershipSalesUpdateContainer = DispatchInjectorExporter<ICreateEditDealershipSalesUpdateContainer>(
    ({ salesUpdate, fkDealershipId, fkUserId, dispatch }) => {
```

### **Benefits of this pattern**
This code refractor reduces redundancy, we can also use the modalPropInjector since we are dealing with a modal that requires a close function. This way we used HOC to get rid of two redundancies!

## **Nest JS Refractor**
This refractor is aiming to reduce duplication of code in one of the service files in HeyAuto

Refractor was made to the following file:
`packages/yd-backend/src/dealership-reviews/dealership-reviews.service.ts`

## **Before Refractor**
This piece of code was being used in 4 different places across the same file:
```
[
    { model: UserEntity },
    {
        model: DealershipEntity,
        required: true,
        include: [
            {
                model: CityEntity,
                include: [{ model: ProvinceEntity }],
            },
        ],
    },
]
```
## **After Refractor**
To reduce the duplication, I have created the following variable:
```
const dealershipReviewsIncludables = [
    { model: UserEntity },
    {
        model: DealershipEntity,
        required: true,
        include: [
            {
                model: CityEntity,
                include: [{ model: ProvinceEntity }],
            },
        ],
    },
];
```
Now instead of redefining the include each time you want to use it, all you need to do is the following:

`include: dealershipReviewsIncludables`
