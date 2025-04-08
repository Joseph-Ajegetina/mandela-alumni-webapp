import { userCredentialsModel, userPaymentModel } from './dataModel';
import { PaymentMethod, PaymentType } from './enum.model';

export const userPayment: userPaymentModel[] = [
    {
        paymentType: PaymentType.monthly_dues,
        amount: 894.7,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.monthly_dues,
        amount: 200,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.event_fees,
        amount: 200,
        paymentMethod: PaymentMethod.credit_card,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.monthly_dues,
        amount: 200,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.event_fees,
        amount: 200,
        paymentMethod: PaymentMethod.credit_card,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.donations,
        amount: 200,
        paymentMethod: PaymentMethod.credit_card,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.event_fees,
        amount: 200,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.donations,
        amount: 200,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.monthly_dues,
        amount: 200,
        paymentMethod: PaymentMethod.mobile_money,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },

    {
        paymentType: PaymentType.donations,
        amount: 200,
        paymentMethod: PaymentMethod.credit_card,
        submittedDate: new Date(),
        time: new Date(), 
        action: "Download/View",
    },
];

export const userCredential: userCredentialsModel[] = [
    {
        firstName: "Dennis",
        lastName: "Peprah",
        profile_image: `<img src= "">`,
    }
]

  
