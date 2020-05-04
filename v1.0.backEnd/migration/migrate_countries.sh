echo | cat <<EOF >country.json
{
  "country": 
    [
EOF

START=1;

cat country.txt | while read c 
do
  code=`echo $c | awk '{print $1}'`
  name=`echo $c | awk '{$1 = ""; print $0}' | sed 's/^\ *//'`

  if [ $START -ne 1 ]
  then
    echo | cat <<EOF >>country.json
      },
EOF
  fi

  echo | cat <<EOF >>country.json
      {
        "code": "$code",
        "name": "$name"
EOF
  START=0;
done

echo | cat <<EOF >>country.json
      }
    ]
}
EOF

curl -i -X POST -d @country.json -H "Content-Type: application/json" http://localhost:4000/covid/country/add
