
export interface userPaymentModel{
        paymentType: string;
        amount: number;
        paymentMethod: string;
        submittedDate: Date;
        time: Date;
        action: string;
    }
export interface userCredentialsModel{
        firstName: string;
        lastName: string;
        profile_image: string;
    }