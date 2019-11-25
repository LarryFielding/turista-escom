import {Accounts} from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";
import {Meteor} from "meteor/meteor";

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({email});

    return true;
});

Meteor.publish(null, function () {
    if (!this.userId) {
        return null;
    }

    return Meteor.users.find(this.userId, {
        fields: {
            services: 1,
            profile: 1,
            roles: 1,
            username: 1,
        },
    });
});
