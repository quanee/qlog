{{ define "apoststable.tpl" }}
    <table class="tabl">
        <thead class="thea">
        <tr class="thead-tr">
            <th class="thead-th">编号</th>
            <th class="thead-th">标题</th>
            <th class="thead-th">摘要</th>
            <th class="thead-th">创建时间</th>
            <th class="thead-th">修改时间</th>
        </tr>
        </thead>

        <tbody class="tbod">

        {{ range $i, $v := .articles }}
            <tr>
                <td>{{ $v.SId }}</td>
                <td><a href="/admin/edit/{{ $v.SId }}">{{ $v.Title }}</a></td>
                <td>{{ $v.Abstract }}</td>
                <td>{{ $v.CreatedTime }}</td>
                <td>{{ $v.CreatedTime }}</td>
            </tr>
        {{ end }}
        </tbody>
    </table>
{{ end }}