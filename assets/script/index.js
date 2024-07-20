import { useAuth } from "../script/utils/use-auth.js";
import { useRouter } from "../script/utils/router.js";

const { checkAuthGuard } = useAuth();
const { navigateTo } = useRouter();

navigateTo('/summary.html');
