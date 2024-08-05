import passport from "passport";
import localStrategy from "./strategies/local.strategy.mjs";
import { jwtStrategy } from "./strategies/jwt.strategy.mjs";

passport.use(localStrategy);
passport.use(jwtStrategy);