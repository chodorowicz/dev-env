res=$(blueutil --is-connected 00-81-2a-f1-bd-94)
if [[ "$res" = '1' ]]; then
    blueutil --unpair 00-81-2a-f1-bd-94
else
    blueutil --unpair 00-81-2a-f1-bd-94
    sleep 1
    blueutil --pair 00-81-2a-f1-bd-94
    sleep 1
    blueutil --connect 00-81-2a-f1-bd-94
fi
