import Route from "./src/route";
import {RootSiblingParent} from "react-native-root-siblings";
export default function App() {
    return (
        <RootSiblingParent>
            <Route />
        </RootSiblingParent>
    )
}
