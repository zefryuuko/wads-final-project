// Services
import UserService from "./UserService";
import ClassService from "./ClassService";

class AccessControlService {
    async checkActiveAccount() {
        const currentActiveAccount = sessionStorage.getItem('activeAccount');

        // Set activeAccount to the user's default account
        if (!currentActiveAccount) {
            this.redirectToDefaultProfile();
            return false;
        }

        // Check if current active account is valid
        const accountId = currentActiveAccount.split(",")[0];
        const accountType = currentActiveAccount.split(",")[1];
        const user = await UserService.getUserById(localStorage.getItem('universalId'))
        
        if (user.accounts.length < 1) {
            // TODO: add no accounts page
            window.alert("There are no profile that is associated with this account. Please contact the administrator.");
            window.location.href = "https://google.com";
        } else {
            for (let i = 0; i < user.accounts.length; i++) {
                if (user.accounts[i]._id === accountId && user.accounts[i].accountType === accountType) {
                    return true;
                }
            }

            this.redirectToDefaultProfile();
            return false;
        }
    }

    redirectToDefaultProfile() {
        UserService.getUserById(localStorage.getItem('universalId'))
        .then((user) => {
            // Check user's default account
            if (user.accounts.length < 1) {
                // TODO: add no accounts page
                window.alert("There are no profile that is associated with this account. Please contact the administrator.");
                window.location.href = "https://google.com";
            } else {
                const defaultAccountType = user.accounts[0].accountType;
                const defaultAccountId = user.accounts[0]._id;

                // Save current active account to localStorage
                sessionStorage.setItem('activeAccount', `${defaultAccountId},${defaultAccountType}`)

                // Redirect to default account dash
                window.location.href = `/${defaultAccountType}`;
            }
        })
    }

    async hasAccessToPage(universalId, domain, callback) {
        domain = domain.split("/");
        const user = await UserService.getUserById(universalId)

        const activeAccountValid = await this.checkActiveAccount();

        if (!activeAccountValid) {
            this.redirectToDefaultProfile();
        }

        switch(domain[1]) {
            case 'student': {
                // Check access for student dashboard
                if (!user.accounts.find(obj => {return obj.accountType === 'student'})) {
                    this.redirectToDefaultProfile();
                    return;
                }

                // Check access for course
                if (domain[2] === "courses" && domain[4] && domain[5]) {
                    const classCode = domain[4];
                    const courseCode = domain[5];
                    try {
                        const result = await ClassService.getCourseByStudentId(universalId);

                        let isEnrolled = false;
                        result.forEach(semester => {
                            const isOnCurrentSemester = semester.classes.find(
                                element => element.classCode === classCode && element.courseCode === courseCode
                            );
                            if (isOnCurrentSemester) isEnrolled = true;
                        })
                        
                        if (callback && !isEnrolled) callback(false);
                        if (!isEnrolled) {
                            // window.location.href = `/${domain[1]}`
                            return false;
                        }
                    } catch (err) {
                        console.log(err)
                        if (callback) callback(false);
                        return false;
                    }
                }
                
                if (callback) callback(true);
                return true;
            }
            case 'lecturer': {
                // Check access for lecturer dashboard
                if (!user.accounts.find(obj => {return obj.accountType === 'lecturer'})) {
                    this.redirectToDefaultProfile();
                    return;
                }

                // Check access for course
                if (domain[2] === "courses" && domain[4] && domain[5]) {
                    const classCode = domain[4];
                    const courseCode = domain[5];
                    try {
                        const result = await ClassService.getCourseByLecturerId(universalId);

                        let isEnrolled = false;
                        result.forEach(semester => {
                            const isOnCurrentSemester = semester.classes.find(
                                element => element.classCode === classCode && element.courseCode === courseCode
                            );
                            if (isOnCurrentSemester) isEnrolled = true;
                        })
                        
                        if (callback && !isEnrolled) callback(false);
                        if (!isEnrolled) {
                            // window.location.href = `/${domain[1]}`
                            return false;
                        }
                    } catch (err) {
                        console.log(err)
                        if (callback) callback(false);
                        return false;
                    }
                }

                if (callback) callback(true);
                return true;
            }
            case 'staff': {
                // Check access for staff dashboard
                if (!user.accounts.find(obj => {return obj.accountType === 'staff'})) {
                    this.redirectToDefaultProfile();
                    return;
                }
                
                if (callback) callback(true);
                return true;
            }
            default: {
                if (callback) callback(false);
                return false;
            }
        }
    }
}

export default new AccessControlService();